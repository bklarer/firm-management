class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :due_date, :creator_id, :project_id

  has_many :assignments
end

