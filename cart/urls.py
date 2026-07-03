from django.urls import path
from .views import (
    CartAddView,
    CartClearView,
    CartDetailView,
    CartRemoveView,
    CartUpdateView,
)

urlpatterns = [
    path("", CartDetailView.as_view(), name="cart-detail"),
    path("add/", CartAddView.as_view(), name="cart-add"),
    path("update/", CartUpdateView.as_view(), name="cart-update"),
    path("remove/<int:product_id>/", CartRemoveView.as_view(), name="cart-remove"),
    path("clear/", CartClearView.as_view(), name="cart-clear"),
]