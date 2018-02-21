# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180220234155) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "definitions", force: :cascade do |t|
    t.string "definition", null: false
    t.string "pos"
    t.string "attribution"
    t.integer "word_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["definition"], name: "index_definitions_on_definition", unique: true
    t.index ["word_id"], name: "index_definitions_on_word_id"
  end

  create_table "examples", force: :cascade do |t|
    t.string "example", null: false
    t.string "example_source"
    t.integer "word_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["example"], name: "index_examples_on_example", unique: true
    t.index ["word_id"], name: "index_examples_on_word_id"
  end

  create_table "list_words", force: :cascade do |t|
    t.integer "list_id", null: false
    t.integer "word_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id", "word_id"], name: "index_list_words_on_list_id_and_word_id", unique: true
  end

  create_table "lists", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_lists", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "list_id"], name: "index_user_lists_on_user_id_and_list_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.integer "points", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.boolean "validation_status", default: false
    t.string "validation_uri"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "word_request_caches", force: :cascade do |t|
    t.string "query", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "query"], name: "index_word_request_caches_on_user_id_and_query", unique: true
  end

  create_table "words", force: :cascade do |t|
    t.string "word", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["word"], name: "index_words_on_word", unique: true
  end

end
