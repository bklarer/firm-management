class Api::AssignmentsController < ApplicationController



    def index
        render json: Assignment.all
    end

    def create
        @assignment = Assignment.create!(assignment_params)
            if @assignment.save
                AssignmentMailer.with(assignment: @assignment).new_assignment_email.deliver_now
                render json: @assignment, status: :created
            else
                render json: { errors: @assignment.errors.full_messages },
                status: :unprocessable_entity
            end
    end

    def show
        assignment = find_assignment
        render json: assignment
    end

    def update
        assignment = find_assignment
        assignment.update!(assignment_params)
        render json: task
    end

    def destroy
        assignment = find_assignment
        assignment.destroy
        head :no_content
    end


    private

    def assignment_params
        params.permit(
            :user_id,
            :task_id
        )
    end

    def find_assignment
        Assignment.find(params[:id])
    end


end
