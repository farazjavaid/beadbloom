from django.urls import path
from .views import (
    CategoryListView,
    FeaturedProductListView,
    ProductDetailView,
    ProductListView,
)

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('featured/', FeaturedProductListView.as_view(), name='featured-products'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]