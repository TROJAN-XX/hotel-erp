from datetime import date, timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand

from apps.accounts.models import User
from apps.bookings.models import Booking
from apps.hotels.models import Hotel
from apps.inventory.models import InventoryItem, StockMovement
from apps.notifications.models import NotificationLog
from apps.reports.models import SalesReport
from apps.rooms.models import Room, RoomType


class Command(BaseCommand):
    help = "Seed the platform with realistic demo hospitality data for admin dashboards and operations pages."

    def handle(self, *args, **options):
        hotel, created = Hotel.objects.get_or_create(
            slug="asteria-residency",
            defaults={
                "name": "Asteria Residency",
                "city": "Bengaluru",
                "state": "Karnataka",
                "country": "India",
                "address": "12 MG Road, Bengaluru",
                "description": "Luxury hospitality and leisure property with hotel, spa, dining, and travel services.",
                "star_rating": 5.0,
                "check_in_time": "14:00:00",
                "check_out_time": "12:00:00",
            },
        )

        room_type, _ = RoomType.objects.get_or_create(
            slug="asteria-deluxe-suite",
            defaults={
                "hotel": hotel,
                "name": "Deluxe Suite",
                "room_size_sqft": 620,
                "max_guests": 3,
                "base_price": Decimal("5200.00"),
                "bed_type": "King",
                "description": "Premium suite with balcony, lounge seating, and city view.",
                "amenities": ["Breakfast", "Wi-Fi", "AC", "Spa access"],
                "is_active": True,
            },
        )

        if not room_type.hotel_id:
            room_type.hotel = hotel
            room_type.save(update_fields=["hotel"])

        for room_number in [101, 102, 203, 204, 305]:
            Room.objects.get_or_create(
                hotel=hotel,
                room_number=str(room_number),
                defaults={
                    "room_type": room_type,
                    "floor": 1 if room_number < 200 else 2,
                    "status": "available",
                    "is_active": True,
                },
            )

        admin_user, _ = User.objects.get_or_create(
            email="admin@asteria.local",
            defaults={
                "first_name": "Asteria",
                "last_name": "Admin",
                "role": "admin",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        admin_user.set_password("admin123")
        admin_user.save(update_fields=["password"])

        customer_user, _ = User.objects.get_or_create(
            email="guest@asteria.local",
            defaults={
                "first_name": "Guest",
                "last_name": "User",
                "role": "customer",
            },
        )

        today = date.today()
        if not Booking.objects.exists():
            Booking.objects.create(
                user=customer_user,
                hotel=hotel,
                room_type=room_type,
                guest_name="Aisha Nair",
                guest_phone="+91 98765 43210",
                check_in=today,
                check_out=today + timedelta(days=2),
                adults=2,
                children=1,
                total_amount=Decimal("24500.00"),
                currency="INR",
                status="confirmed",
                notes="Arrival in the evening with airport transfer request.",
            )
            Booking.objects.create(
                user=customer_user,
                hotel=hotel,
                room_type=room_type,
                guest_name="Karthik Rao",
                guest_phone="+91 99880 12345",
                check_in=today + timedelta(days=4),
                check_out=today + timedelta(days=7),
                adults=2,
                children=0,
                total_amount=Decimal("36200.00"),
                currency="INR",
                status="pending",
                notes="Business stay and breakfast package.",
            )
            Booking.objects.create(
                user=customer_user,
                hotel=hotel,
                room_type=room_type,
                guest_name="Milan Thomas",
                guest_phone="+91 97666 55443",
                check_in=today - timedelta(days=1),
                check_out=today + timedelta(days=2),
                adults=2,
                children=0,
                total_amount=Decimal("18900.00"),
                currency="INR",
                status="checked_in",
                notes="Guest check-in completed at front desk.",
            )

        inventory_items = [
            ("Fresh linens", "LIN-001", "Housekeeping", 620, 150, "units"),
            ("Breakfast ingredients", "BRK-102", "Dining", 84, 180, "units"),
            ("Spa oils", "SPA-210", "Wellness", 240, 100, "units"),
            ("Housekeeping consumables", "HOUSE-88", "Housekeeping", 52, 120, "units"),
            ("Bar spirits", "BAR-340", "Bar", 310, 120, "units"),
        ]

        for name, sku, category, current_stock, reorder_level, unit in inventory_items:
            InventoryItem.objects.get_or_create(
                sku=sku,
                defaults={
                    "name": name,
                    "category": category,
                    "current_stock": current_stock,
                    "reorder_level": reorder_level,
                    "unit": unit,
                    "is_active": True,
                },
            )

        if not StockMovement.objects.exists():
            item_map = {
                "Fresh linens": InventoryItem.objects.filter(name="Fresh linens").first(),
                "Breakfast ingredients": InventoryItem.objects.filter(name="Breakfast ingredients").first(),
                "Spa oils": InventoryItem.objects.filter(name="Spa oils").first(),
                "Bar spirits": InventoryItem.objects.filter(name="Bar spirits").first(),
            }
            stock_updates = [
                ("Fresh linens", "Rooms received", "inbound", 42, "Room service delivery"),
                ("Breakfast ingredients", "Dining issued", "outbound", -18, "Breakfast operation"),
                ("Spa oils", "Spa stock returned", "inbound", 9, "Therapy stock return"),
                ("Bar spirits", "Bar transfers", "outbound", -7, "Bar inventory transfer"),
            ]
            for item_name, item_label, movement_type, quantity, notes in stock_updates:
                item = item_map.get(item_name) or InventoryItem.objects.order_by("id").first()
                StockMovement.objects.create(
                    item=item,
                    movement_type=movement_type,
                    quantity=quantity,
                    reference=item_label,
                    notes=notes,
                )

        if not NotificationLog.objects.exists():
            NotificationLog.objects.create(
                recipient="vip@guest.com",
                channel="email",
                subject="VIP arrival checklist",
                message="Concierge team requested final room setup for Suite 204 by 4:30 PM.",
                status="sent",
            )
            NotificationLog.objects.create(
                recipient="ops@asteria.local",
                channel="sms",
                subject="Refund review pending",
                message="2 refund cases need admin approval before the end of the day.",
                status="queued",
            )
            NotificationLog.objects.create(
                recipient="guest@asteria.local",
                channel="push",
                subject="New guest review",
                message="A guest left a 5-star review for spa and dining services.",
                status="sent",
            )
            NotificationLog.objects.create(
                recipient="inventory@asteria.local",
                channel="email",
                subject="Inventory update",
                message="Breakfast inventory has dropped below the recommended reorder threshold.",
                status="queued",
            )

        if not SalesReport.objects.exists():
            SalesReport.objects.create(
                title="Monthly overview",
                report_type="monthly",
                period_start=date.today() - timedelta(days=30),
                period_end=date.today(),
                total_revenue=Decimal("486000.00"),
                total_bookings=128,
                summary="Strong occupancy and repeat guest demand across room and wellness services.",
            )
            SalesReport.objects.create(
                title="Last 30 days",
                report_type="weekly",
                period_start=date.today() - timedelta(days=30),
                period_end=date.today() - timedelta(days=7),
                total_revenue=Decimal("332000.00"),
                total_bookings=92,
                summary="Dining and wellness demand remain elevated over the last reporting cycle.",
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Demo hospitality data seeded successfully for hotels, bookings, inventory, notifications, and sales reporting."
            )
        )
