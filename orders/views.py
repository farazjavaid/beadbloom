from decimal import Decimal
import uuid

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart
from .models import ShippingAddress, Order, OrderItem
from .serializers import ShippingAddressSerializer, OrderSerializer


class ShippingAddressListCreateView(generics.ListCreateAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShippingAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CheckoutSummaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        subtotal = sum(item.total_price for item in cart.items.all())
        shipping_cost = Decimal("5.00")
        tax = Decimal("0.00")
        grand_total = subtotal + shipping_cost + tax

        return Response({
            "subtotal": subtotal,
            "shipping_cost": shipping_cost,
            "tax": tax,
            "grand_total": grand_total,
        })


class PlaceOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        shipping_address_id = request.data.get("shipping_address_id")
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        try:
            shipping_address = ShippingAddress.objects.get(
                id=shipping_address_id,
                user=request.user
            )
        except ShippingAddress.DoesNotExist:
            return Response({"error": "Shipping address not found"}, status=404)

        subtotal = sum(item.total_price for item in cart.items.all())
        shipping_cost = Decimal("5.00")
        tax = Decimal("0.00")
        grand_total = subtotal + shipping_cost + tax

        order = Order.objects.create(
            user=request.user,
            shipping_address=shipping_address,
            order_number=f"BB-{uuid.uuid4().hex[:10].upper()}",
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax=tax,
            grand_total=grand_total,
        )

        for item in cart.items.all():
            if item.product.stock < item.quantity:
                order.delete()
                return Response(
                    {"error": f"Not enough stock for {item.product.name}"},
                    status=400
                )

            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                quantity=item.quantity,
                unit_price=item.unit_price,
            )

            item.product.stock -= item.quantity
            item.product.save()

        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)