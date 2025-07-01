CREATE TEXT SEARCH CONFIGURATION japanese ( COPY = simple );

create or replace function search_circles(keyword text)
returns table (
  id text,
  name text,
  detail text,
  score real
)
language sql
as $$
  select id, name, detail,
    ts_rank(
      to_tsvector('simple', name || ' ' || detail),
      plainto_tsquery('simple', keyword)
    ) as score
  from circles
  where to_tsvector('simple', name || ' ' || detail)
    @@ plainto_tsquery('simple', keyword)
  order by score desc;
$$;
