from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.models import Product
from .models import Cart, CartItem
from .serializers import CartSerializer


def get_or_create_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart


class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_or_create_cart(self.request.user)


class CartAddView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        try:
            product = Product.objects.get(id=product_id, active=True)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        cart = get_or_create_cart(request.user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                "quantity": quantity,
                "unit_price": product.final_price,
            },
        )

        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartSerializer(cart, context={"request": request}).data, status=201)


class CartUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        cart = get_or_create_cart(request.user)

        try:
            item = CartItem.objects.get(cart=cart, product_id=product_id)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in cart"}, status=404)

        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()

        return Response(CartSerializer(cart, context={"request": request}).data)


class CartRemoveView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        cart = get_or_create_cart(request.user)
        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return Response(CartSerializer(cart, context={"request": request}).data)


class CartClearView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart = get_or_create_cart(request.user)
        cart.items.all().delete()
        return Response({"message": "Cart cleared"})