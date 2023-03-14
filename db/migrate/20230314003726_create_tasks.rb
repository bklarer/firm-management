class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :notes
      t.datetime :due_date
      t.integer :creator_id
      t.integer :project_id

      t.timestamps
    end
  end
end
