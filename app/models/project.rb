class Project < ApplicationRecord
    has_many :tasks

    validates :title, :creator_id, :due_date, presence: true

end
