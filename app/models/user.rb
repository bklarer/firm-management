class User < ApplicationRecord
    has_secure_password

    has_many :assignments
    has_many :tasks, through: :assignments

    has_many :created_tasks, class_name: "Task", foreign_key: "creator_id"

    validates :username, presence: true, uniqueness: true
    validates :first_name, :last_name, presence: true
end
