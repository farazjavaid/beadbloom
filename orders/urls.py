from django.urls import path
from .views import (
    CheckoutSummaryView,
    OrderDetailView,
    OrderListView,
    PlaceOrderView,
    ShippingAddressListCreateView,
)

urlpatterns = [
    path("addresses/", ShippingAddressListCreateView.as_view(), name="shipping-addresses"),
    path("checkout/", CheckoutSummaryView.as_view(), name="checkout-summary"),
    path("place/", PlaceOrderView.as_view(), name="place-order"),
    path("", OrderListView.as_view(), name="orders"),
    path("<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
]