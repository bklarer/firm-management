class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :created_at, :due_date, :creator_id, :project_id, :completed

end

