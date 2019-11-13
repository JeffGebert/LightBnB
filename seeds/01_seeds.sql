
INSERT INTO users (name, email, password)
VALUES('jeff', 'jeff@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('nina', 'nina@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('aaron', 'aaron@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1,'JEFFS SCHACK', 'DESCRIPTION','http://www.tsn.ca','http://www.tsn2.ca', 55,1,1,1, 'CANADA', '59 Turgeon CRES', 'REGINA', 'SASK', 'S4V-3C7', TRUE),
(2,'NINAS PALACE', 'DESCRIPTION','http://www.tsn.ca','http://www.tsn2.ca', 557,2,3,1, 'CANADA', '4023 ST. ANTOINNE W', 'MONTREAL', 'QC', 'H2Y-3G9', TRUE),
(3,'WHISTLER', 'DESCRIPTION','http://www.tsn.ca','http://www.tsn2.ca', 989,1,3,1, 'CANADA', '59 SKI LANE', 'WHISTLER', 'BC', 'H2Y-3C7', FALSE);



INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES('2019-11-24', '2019-11-29', 1, 1),
('2019-12-24', '2019-12-26', 2, 2),
('2019-12-05', '2019-12-08', 3, 3);

INSERT INTO property_reviews(guest_id,property_id,reservation_id,rating,message)
VALUES(1,1,1,5,'message'),
(2,2,2,4,'message'),
(3,3,3,5,'message');



