# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_proteus_tool_session',
  :secret      => '90e81682188fadbfbddd6b3a2c671274591517217e1ae62b3fbcd4547f9e7a906bd30ffeb933e71edeed3b4e55f8b28e490f1ff44cdc7b95345d2fb2a86110d6'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
