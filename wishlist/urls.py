from django.urls import path

from .views import (
    WishlistAddView,
    WishlistListView,
    WishlistRemoveView,
)

urlpatterns = [
    path("", WishlistListView.as_view(), name="wishlist"),
    path("add/", WishlistAddView.as_view(), name="wishlist-add"),
    path(
        "remove/<int:product_id>/",
        WishlistRemoveView.as_view(),
        name="wishlist-remove",
    ),
]