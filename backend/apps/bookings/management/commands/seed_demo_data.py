import random
from datetime import date, timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand

from apps.accounts.models import User
from apps.bookings.models import Booking, BookingItem
from apps.hotels.models import Hotel
from apps.inventory.models import InventoryItem, StockMovement
from apps.notifications.models import NotificationLog
from apps.reports.models import SalesReport
from apps.rooms.models import Room, RoomType


class Command(BaseCommand):
    help = "Seed the platform with a large realistic demo hospitality dataset across hotels, bookings, inventory, notifications, and sales."

    def handle(self, *args, **options):
        today = date.today()
        first_names = [
            "Aisha", "Karan", "Priya", "Rohan", "Ananya", "Vikram", "Nisha", "Arjun",
            "Meera", "Rahul", "Ishita", "Aditya", "Sonia", "Dev", "Sneha", "Harsh",
            "Neha", "Kabir", "Divya", "Yash", "Pooja", "Varun", "Ritika", "Manish",
            "Tanvi", "Chetan", "Kavya", "Rakesh", "Mira", "Siddharth", "Aditi"
        ]
        last_names = [
            "Nair", "Sharma", "Reddy", "Patel", "Mehta", "Iyer", "Kapoor", "Sethi",
            "Rao", "Sen", "Das", "Verma", "Singh", "Mishra", "Khan", "Thomas",
            "Joseph", "Bose", "Chopra", "Nandan", "Kulkarni", "Dutta", "Bhatia", "Jain"
        ]
        hotel_configs = [
            {
                "slug": "asteria-residency",
                "name": "Asteria Residency",
                "city": "Bengaluru",
                "state": "Karnataka",
                "country": "India",
                "address": "12 MG Road, Bengaluru",
                "description": "Luxury business and leisure property with wellness, dining, and concierge services.",
                "star_rating": 5.0,
                "check_in_time": "14:00:00",
                "check_out_time": "12:00:00",
            },
            {
                "slug": "sunset-cove",
                "name": "Sunset Cove",
                "city": "Goa",
                "state": "Goa",
                "country": "India",
                "address": "Beach Road, North Goa",
                "description": "Coastal resort with poolside suites, yoga decks, and family-friendly dining.",
                "star_rating": 4.5,
                "check_in_time": "15:00:00",
                "check_out_time": "11:00:00",
            },
            {
                "slug": "opal-hills",
                "name": "Opal Hills",
                "city": "Shimla",
                "state": "Himachal Pradesh",
                "country": "India",
                "address": "Mall Road, Shimla",
                "description": "Hill retreat with panoramic suites, spa experiences, and mountain dining.",
                "star_rating": 4.8,
                "check_in_time": "14:00:00",
                "check_out_time": "12:00:00",
            },
            {
                "slug": "pearl-arc",
                "name": "Pearl Arc Suites",
                "city": "Jaipur",
                "state": "Rajasthan",
                "country": "India",
                "address": "Vaishali Nagar, Jaipur",
                "description": "Boutique heritage hotel blending royal style with modern hospitality operations.",
                "star_rating": 4.6,
                "check_in_time": "13:00:00",
                "check_out_time": "12:00:00",
            },
        ]

        hotels = []
        for config in hotel_configs:
            hotel, _ = Hotel.objects.get_or_create(slug=config["slug"], defaults=config)
            hotels.append(hotel)

        room_templates = [
            {
                "name": "Deluxe Suite",
                "slug": "deluxe-suite",
                "base_price": Decimal("5200.00"),
                "amenities": ["Breakfast", "Wi-Fi", "AC", "City View"],
                "bed_type": "King",
                "room_size_sqft": 620,
                "max_guests": 3,
            },
            {
                "name": "Executive Room",
                "slug": "executive-room",
                "base_price": Decimal("3800.00"),
                "amenities": ["Wi-Fi", "Breakfast", "Workspace"],
                "bed_type": "Queen",
                "room_size_sqft": 420,
                "max_guests": 2,
            },
            {
                "name": "Family Villa",
                "slug": "family-villa",
                "base_price": Decimal("7600.00"),
                "amenities": ["Private Lounge", "Pool Access", "Breakfast", "Mini Bar"],
                "bed_type": "King + Twin",
                "room_size_sqft": 980,
                "max_guests": 5,
            },
        ]

        room_types = []
        for hotel in hotels:
            for template in room_templates:
                room_type, _ = RoomType.objects.get_or_create(
                    slug=f"{hotel.slug}-{template['slug']}",
                    defaults={
                        "hotel": hotel,
                        "name": template["name"],
                        "room_size_sqft": template["room_size_sqft"],
                        "max_guests": template["max_guests"],
                        "base_price": template["base_price"],
                        "bed_type": template["bed_type"],
                        "description": f"{template['name']} designed for {hotel.name} guests.",
                        "amenities": template["amenities"],
                        "is_active": True,
                    },
                )
                room_types.append(room_type)
                for floor in [1, 2, 3]:
                    room_number = (floor * 100) + (len(room_types) % 20) + 1
                    Room.objects.get_or_create(
                        hotel=hotel,
                        room_number=str(room_number),
                        defaults={
                            "room_type": room_type,
                            "floor": floor,
                            "status": random.choice(["available", "occupied", "maintenance", "available"]),
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

        staff_names = [
            ("Nina", "Desk", "staff"),
            ("Karan", "Manager", "admin"),
            ("Megha", "Ops", "staff"),
            ("Ritika", "Guest", "staff"),
            ("Sanjay", "Front", "staff"),
        ]
        for first_name, last_name, role in staff_names:
            User.objects.get_or_create(
                email=f"{first_name.lower()}@asteria.local",
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": role,
                    "is_staff": role in {"staff", "admin"},
                },
            )

        customer_users = []
        for idx in range(30):
            first = random.choice(first_names)
            last = random.choice(last_names)
            email = f"{first.lower()}.{last.lower()}{idx}@demo.local"
            user, _ = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": first,
                    "last_name": last,
                    "role": "customer",
                    "phone_number": f"+91 {random.randint(7000000000, 9999999999)}",
                },
            )
            customer_users.append(user)

        for _ in range(70):
            hotel = random.choice(hotels)
            room_type = random.choice(list(RoomType.objects.filter(hotel=hotel)))
            user = random.choice(customer_users)
            check_in = today - timedelta(days=random.randint(1, 120))
            nights = random.randint(1, 7)
            check_out = check_in + timedelta(days=nights)
            adults = random.randint(1, 3)
            children = random.randint(0, 2)
            total_amount = Decimal(room_type.base_price) * Decimal(nights)
            if adults > 2:
                total_amount += Decimal(random.randint(500, 1500))
            status = random.choices(
                ["pending", "confirmed", "checked_in", "completed", "cancelled"],
                weights=[2, 6, 4, 7, 2],
                k=1,
            )[0]
            booking = Booking.objects.create(
                user=user,
                hotel=hotel,
                room_type=room_type,
                guest_name=f"{user.first_name} {user.last_name}",
                guest_phone=user.phone_number or f"+91 {random.randint(7000000000, 9999999999)}",
                check_in=check_in,
                check_out=check_out,
                adults=adults,
                children=children,
                total_amount=total_amount,
                currency="INR",
                status=status,
                notes=random.choice([
                    "Late arrival requested.",
                    "Airport transfer booked.",
                    "Breakfast package included.",
                    "Early checkout declined by guest.",
                    "VIP room setup requested.",
                    "Family room with extra bedding requested.",
                    "Wellness add-on included.",
                    "Business travel booking.",
                ]),
            )
            BookingItem.objects.create(
                booking=booking,
                item_type="room",
                item_name=room_type.name,
                quantity=1,
                rate=room_type.base_price,
                nights=nights,
                subtotal=total_amount,
            )
            if random.choice([True, False]):
                BookingItem.objects.create(
                    booking=booking,
                    item_type="service",
                    item_name=random.choice(["Airport transfer", "Spa package", "Dinner for two", "Breakfast plan"]),
                    quantity=random.randint(1, 2),
                    rate=Decimal(random.randint(500, 2800)),
                    nights=1,
                    subtotal=Decimal(random.randint(500, 2800)) * Decimal(random.randint(1, 2)),
                )

        inventory_catalog = [
            ("Fresh linens", "LIN-001", "Housekeeping", 620, 180, "units"),
            ("Breakfast ingredients", "BRK-102", "Dining", 84, 120, "units"),
            ("Spa oils", "SPA-210", "Wellness", 240, 80, "units"),
            ("Housekeeping consumables", "HOUSE-88", "Housekeeping", 52, 90, "units"),
            ("Bar spirits", "BAR-340", "Bar", 310, 100, "units"),
            ("Toiletries kit", "TOI-330", "Housekeeping", 180, 60, "units"),
            ("Catering produce", "CAT-440", "Dining", 540, 200, "kg"),
            ("Pool chemicals", "POOL-120", "Maintenance", 240, 70, "liters"),
            ("Laundry detergents", "LAU-560", "Housekeeping", 96, 50, "liters"),
            ("Fitness equipment", "FIT-700", "Wellness", 90, 25, "units"),
        ]

        for name, sku, category, current_stock, reorder_level, unit in inventory_catalog:
            item, created = InventoryItem.objects.get_or_create(
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
            if created:
                StockMovement.objects.create(
                    item=item,
                    movement_type="inbound",
                    quantity=current_stock,
                    reference="Initial stock",
                    notes="Initial inventory import.",
                )

            for _ in range(random.randint(2, 5)):
                StockMovement.objects.create(
                    item=item,
                    movement_type=random.choice(["inbound", "outbound", "adjustment"]),
                    quantity=random.randint(-40, 55),
                    reference=random.choice(["Procurement", "Usage", "Transfer", "Audit"]),
                    notes=random.choice([
                        "Operational consumption",
                        "Daily stock adjustment",
                        "Restaurant transfer",
                        "Seasonal demand increase",
                        "Issue resolved after inspection",
                    ]),
                )

        for _ in range(30):
            NotificationLog.objects.create(
                recipient=random.choice([
                    "ops@asteria.local",
                    "guest@demo.local",
                    "support@asteria.local",
                    "inventory@asteria.local",
                    "vip@guest.com",
                    "team@hotel.local",
                ]),
                channel=random.choice(["email", "sms", "whatsapp", "push"]),
                subject=random.choice([
                    "Guest request update",
                    "Delivery scheduled",
                    "Booking confirmation",
                    "Inventory threshold alert",
                    "Service review request",
                    "Check-in reminder",
                ]),
                message=random.choice([
                    "A guest requested a room upgrade for the upcoming stay.",
                    "Dining team submitted a new delivery request for the evening shift.",
                    "A refund review requires approval before the final check.",
                    "A wellness package is now ready for the guest arrival.",
                    "A stock item is below the preferred reorder level.",
                    "A guest left a detailed service review from the previous stay.",
                ]),
                status=random.choice(["queued", "sent", "failed"]),
            )

        for month_index in range(12):
            month_number = today.month - month_index
            year = today.year
            while month_number <= 0:
                month_number += 12
                year -= 1

            period_start = date(year, month_number, 1)
            next_month = month_number + 1
            next_year = year
            if next_month > 12:
                next_month = 1
                next_year += 1
            period_end = date(next_year, next_month, 1) - timedelta(days=1)

            SalesReport.objects.get_or_create(
                title=f"{period_start.strftime('%b %Y')} revenue",
                defaults={
                    "report_type": random.choice(["daily", "weekly", "monthly", "yearly"]),
                    "period_start": period_start,
                    "period_end": period_end,
                    "total_revenue": Decimal(str(random.randint(250000, 1500000))),
                    "total_bookings": random.randint(80, 420),
                    "summary": random.choice([
                        "Occupancy remained healthy across room and wellness services.",
                        "Strong demand from business and leisure travelers in the region.",
                        "Dining and spa services drove incremental revenue this cycle.",
                        "Guest satisfaction and repeat bookings improved operational performance.",
                    ]),
                },
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Demo hospitality data seeded successfully across hotels, rooms, guests, bookings, inventory, notifications, and sales reports."
            )
        )
