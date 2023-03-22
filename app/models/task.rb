class Task < ApplicationRecord
    has_many :assignments
    has_many :users, through: :assignments
    belongs_to :creator, class_name: "User"
    belongs_to :project, optional: true

    validates :title, :due_date, :creator_id, presence: true


end
