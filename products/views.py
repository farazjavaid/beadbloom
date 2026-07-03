from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(active=True)


class FeaturedProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(active=True, featured=True)


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Product.objects.filter(active=True)