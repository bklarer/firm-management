class Project < ApplicationRecord
    has_many :tasks, dependent: :nullify

    validates :title, :creator_id, :due_date, presence: true

end
