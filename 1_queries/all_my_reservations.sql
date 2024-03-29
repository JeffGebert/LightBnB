select properties.*, reservations.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON property_id = properties.id 
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1 and end_date <= now()::date
GROUP BY properties.id,reservations.id
ORDER BY start_date asc
LIMIT 10;