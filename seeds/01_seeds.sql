INSERT INTO users (name, email, password)
VALUES ('Taylor Swift', 'speak_now1989@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
), ('Poison Ivy', 'green.thumb@savetheplanet.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
), ('Posh Spice', 'posh@spicegirls.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
), ('The Countess', 'luann-delesseps@rhony.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Holiday House', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350 ', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 131, 5, 4, 4, 'Canada', '13 Little Town Street', 'Country Side', 'Nova Scotia', 'T1A 3S0', TRUE), (2, 'Nature Retreat', 'description', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 110, 2, 2, 3, 'Canada', '9 Flora Way', 'Sydney', 'British Columbia', 'P1I I5Y', TRUE), (3, 'Mansion with a View', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 150, 5, 5, 5, 'Canada', '917 16 Ave', 'Toronto', 'Ontario', 'L3R 3N6', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-17', 1, 2), ('2018-10-13', '2018-10-16', 3, 1), ('2018-12-20', '2018-09-17', 2, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 5, 'message'), (1, 3, 2, 5, 'message'), (4, 3, 3, 4, 'message');