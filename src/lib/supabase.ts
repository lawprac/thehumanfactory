import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://zffoblmlqesxcmhushbz.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlhMWExZThjLWYyM2UtNDUyNS04ZTdiLTFlNTNkMTEzMzZhNyJ9.eyJwcm9qZWN0SWQiOiJ6ZmZvYmxtbHFlc3hjbWh1c2hieiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY4MjQ0MDUxLCJleHAiOjIwODM2MDQwNTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.dQpy3WZXtDYjgzpUtkCF9BtGM-zjRHj5Oz-XqovMBmU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };