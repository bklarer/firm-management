class ChangeDefaultOnCompletedProjects < ActiveRecord::Migration[7.0]
  def change
    change_column_default :projects, :completed, false
  end
end
