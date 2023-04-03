class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator_id, :due_date, :completed
end
