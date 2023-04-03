class AddNotesToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :notes, :text
  end
end
