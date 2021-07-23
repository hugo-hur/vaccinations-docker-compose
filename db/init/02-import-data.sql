\connect vaccin vaccin_impl
-- insert data from json tables to the "real" tables
insert into orders (
 id
,order_number
,responsible_person
,health_care_district
,vaccine
,injections
,arrived
,expires
)
select
 ("json"->>'id')::uuid
,("json"->>'orderNumber')::int
,("json"->>'responsiblePerson')
,("json"->>'healthCareDistrict')
,("json"->>'vaccine')
,("json"->>'injections')::int
,("json"->>'arrived')::timestamp with time zone
,("json"->>'arrived')::timestamp with time zone + interval '30' day
from orders_j;

insert into vaccinations (
 id
,orders_id
,gender
,vaccination_date
)
select
 ("json"->>'vaccination-id')::uuid
,("json"->>'sourceBottle')::uuid
,("json"->>'gender')
,("json"->>'vaccinationDate')::timestamp with time zone
from vaccinations_j;

