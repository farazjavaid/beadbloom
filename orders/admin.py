from django.contrib import admin
from .models import Order, OrderItem, ShippingAddress


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "product_name", "quantity", "unit_price", "total_price")

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_number",
        "user",
        "status",
        "subtotal",
        "shipping_cost",
        "grand_total",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("order_number", "user__username", "user__email")
    readonly_fields = (
        "order_number",
        "user",
        "shipping_address",
        "subtotal",
        "shipping_cost",
        "tax",
        "grand_total",
        "created_at",
    )
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product_name", "quantity", "unit_price", "total_price")
    search_fields = ("product_name", "order__order_number")


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ("full_name", "user", "phone", "city", "country", "postal_code", "is_default")
    search_fields = ("full_name", "phone", "city", "user__email")