DO $$
BEGIN
  -- Si la table iceberg_namespaces existe, appliquer les REVOKE, ALTER, DROP CONSTRAINT, DROP INDEX et DROP TABLE
  IF EXISTS (
    SELECT 1
      FROM information_schema.tables
     WHERE table_schema = 'storage'
       AND table_name   = 'iceberg_namespaces'
  ) THEN
    -- Révocations sur iceberg_namespaces
    REVOKE SELECT      ON storage.iceberg_namespaces FROM anon;
    REVOKE SELECT      ON storage.iceberg_namespaces FROM authenticated;
    REVOKE DELETE      ON storage.iceberg_namespaces FROM service_role;
    REVOKE INSERT      ON storage.iceberg_namespaces FROM service_role;
    REVOKE REFERENCES  ON storage.iceberg_namespaces FROM service_role;
    REVOKE SELECT      ON storage.iceberg_namespaces FROM service_role;
    REVOKE TRIGGER     ON storage.iceberg_namespaces FROM service_role;
    REVOKE TRUNCATE    ON storage.iceberg_namespaces FROM service_role;
    REVOKE UPDATE      ON storage.iceberg_namespaces FROM service_role;

    -- Contraintes et index sur iceberg_namespaces
    BEGIN
      ALTER TABLE storage.iceberg_namespaces DROP CONSTRAINT iceberg_namespaces_bucket_id_fkey;
    EXCEPTION WHEN undefined_object THEN END;
    BEGIN
      ALTER TABLE storage.iceberg_namespaces DROP CONSTRAINT iceberg_namespaces_pkey;
    EXCEPTION WHEN undefined_object THEN END;
    DROP INDEX IF EXISTS storage.iceberg_namespaces_pkey;
    DROP INDEX IF EXISTS storage.idx_iceberg_namespaces_bucket_id;

    -- Suppression de la table
    DROP TABLE storage.iceberg_namespaces;
  END IF;

  -- Si la table iceberg_tables existe, appliquer les REVOKE, ALTER, DROP CONSTRAINT, DROP INDEX et DROP TABLE
  IF EXISTS (
    SELECT 1
      FROM information_schema.tables
     WHERE table_schema = 'storage'
       AND table_name   = 'iceberg_tables'
  ) THEN
    -- Révocations sur iceberg_tables
    REVOKE SELECT      ON storage.iceberg_tables FROM anon;
    REVOKE SELECT      ON storage.iceberg_tables FROM authenticated;
    REVOKE DELETE      ON storage.iceberg_tables FROM service_role;
    REVOKE INSERT      ON storage.iceberg_tables FROM service_role;
    REVOKE REFERENCES  ON storage.iceberg_tables FROM service_role;
    REVOKE SELECT      ON storage.iceberg_tables FROM service_role;
    REVOKE TRIGGER     ON storage.iceberg_tables FROM service_role;
    REVOKE TRUNCATE    ON storage.iceberg_tables FROM service_role;
    REVOKE UPDATE      ON storage.iceberg_tables FROM service_role;

    -- Contraintes et index sur iceberg_tables
    BEGIN
      ALTER TABLE storage.iceberg_tables DROP CONSTRAINT iceberg_tables_bucket_id_fkey;
    EXCEPTION WHEN undefined_object THEN END;
    BEGIN
      ALTER TABLE storage.iceberg_tables DROP CONSTRAINT iceberg_tables_namespace_id_fkey;
    EXCEPTION WHEN undefined_object THEN END;
    BEGIN
      ALTER TABLE storage.iceberg_tables DROP CONSTRAINT iceberg_tables_pkey;
    EXCEPTION WHEN undefined_object THEN END;
    DROP INDEX IF EXISTS storage.iceberg_tables_pkey;
    DROP INDEX IF EXISTS storage.idx_iceberg_tables_namespace_id;

    -- Suppression de la table
    DROP TABLE storage.iceberg_tables;
  END IF;
END
$$;
