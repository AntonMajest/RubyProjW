class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :desc
      t.string :time

      t.timestamps
    end
  end
end
