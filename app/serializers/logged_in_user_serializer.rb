class LoggedInUserSerializer < ActiveModel::Serializer
    attributes :id, :username, :first_name, :last_name
  
    has_many :created_tasks
    has_many :tasks
  end