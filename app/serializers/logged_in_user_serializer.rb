class LoggedInUserSerializer < ActiveModel::Serializer
    attributes :id, :username, :first_name, :last_name, :email
  
    has_many :created_tasks
  end