create view orders_v as
select
 ("json"->>'id')::uuid           as id
,("json"->>'orderNumber')::int   as order_number
,("json"->>'responsiblePerson')  as responsible_personn
,("json"->>'healthCareDistrict') as health_care_district
,("json"->>'vaccine')            as vaccine
,("json"->>'injections')::int    as injections
,("json"->>'arrived')::timestamp with time zone as arrived
from orders_j;

create view vaccinations_v as
select
 ("json"->>'"json"_id')::uuid    as id
,("json"->>'sourceBottle')::uuid as orders_id
,("json"->>'gender')             as gender
,("json"->>'vaccinationDate'):: timestamp with time zone as vaccination_date
from vaccinations_j;
