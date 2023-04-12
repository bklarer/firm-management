class AssignmentMailer < ApplicationMailer
    def new_assignment_email
        @assignment = params[:assignment]
        # @task = @assignment.task
        # @user = @assignment.user
        # @creator = @task.creator
        mail(to: 'uncle.brk@gmail.com', subject: 'New Assignment')
    end


end
