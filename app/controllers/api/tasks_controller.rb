class Api::TasksController < ApplicationController


    def index
        render json: Task.all, status: :ok
    end

    def create
        task = Task.create!(task_params.merge(creator_id: @current_user[:id]))
        user_ids = params[:user_ids]
        assignments = []
        
        user_ids.each do |user_id|
          assignment = Assignment.create!(user_id: user_id, task_id: task.id)
          assignments << assignment
        end
        
        render json: { task: task, assignments: assignments }, status: :created
    end

    def show
        task = find_task
        render json: task, status: :ok
    end

    def update
        task = find_task
        user_ids = params[:user_ids]
        assignments = []
        
        # user_ids.each do |user_id|
        #   assignment = Assignment.create!(user_id: user_id, task_id: task.id)
        #   assignments << assignment
        # end
        # need to change above to check if an assignment already exists

        user_ids.each do |user_id|
            assignment = Assignment.find_by(user_id: user_id, task_id: task.id)
            if assignment.nil?
                assignment = Assignment.create!(user_id: user_id, task_id: task.id)
            end
            assignments << assignment
        end

        task.update!(task_params)
        render json: { task: task, assignments: assignments }, status: :accepted
    end

    def destroy
        task = find_task
        task.destroy
        head :no_content
    end


    private

    def task_params
        params.permit(
            :title,
            :notes,
            :due_date,
            :project_id,
            :completed,
        )
    end

    def find_task
        Task.find(params[:id])
    end


end
