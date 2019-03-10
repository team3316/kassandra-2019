/*
  In this file, the tables from the ISDE2 db schema are migrated to the ISDE4
  schema
 */

ALTER TABLE kassandra.cycles
  /* Change comment type to TEXT */
  ALTER COLUMN comment TYPE TEXT;

CREATE TYPE enum_cycles_defence_state AS ENUM ('non', 'defended', 'offended');
ALTER TABLE kassandra.cycles
ALTER COLUMN comment type text,
ADD defence_state enum_cycles_defence_state NOT NULL DEFAULT 'non'::enum_cycles_defence_state,
ADD defence_comment text default "",
ADD offender integer default 0;
