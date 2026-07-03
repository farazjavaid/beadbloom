from django.contrib import admin
from .models import Category, Product, ProductImage, ProductReview


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductReviewInline(admin.TabularInline):
    model = ProductReview
    extra = 0
    readonly_fields = ("user", "rating", "comment", "created_at")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "sale_price", "stock", "badge", "featured", "active")
    list_filter = ("category", "featured", "active")
    search_fields = ("name", "description", "sku")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline, ProductReviewInline]


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "rating", "active", "created_at")
    list_filter = ("rating", "active", "created_at")