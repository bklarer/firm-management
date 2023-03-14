class Photo < ApplicationRecord
    belongs_to :user

    validates :image, :user_id, presence: true
end
