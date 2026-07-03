from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.models import Product
from .models import WishlistItem
from .serializers import WishlistItemSerializer


class WishlistListView(generics.ListAPIView):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishlistItem.objects.filter(user=self.request.user)


class WishlistAddView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item, created = WishlistItem.objects.get_or_create(
            user=request.user,
            product=product,
        )

        if not created:
            return Response(
                {"message": "Already in wishlist"},
                status=status.HTTP_200_OK,
            )

        serializer = WishlistItemSerializer(item, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WishlistRemoveView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        WishlistItem.objects.filter(
            user=request.user,
            product_id=product_id,
        ).delete()

        return Response(
            {"message": "Removed from wishlist"},
            status=status.HTTP_200_OK,
        )