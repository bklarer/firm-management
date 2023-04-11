class Api::PhotosController < ApplicationController



    def create
        result = Cloudinary::Uploader.upload(params[:image])
        photo = Photo.create(user_id: params[:id], image: result['url'])
        if photo.save
            render json: photo
         else
            render json: photo.errors
         end
    end

end


#TODO MOVE TO USER, MIGRATE AND SETUP NEW COLUMN "image"
#TODO DELETE PHOTO TABLE
#TODO ADD PUBLIC ID TO USER MODEL public_id: result['public_id']
#TODO IF PUBLIC ID EXISTS, DELETE IMAGE FROM CLOUDINARY AND UPLOAD NEW ONE
#TODO IF A USER IS DELETED, DELETE THEIR IMAGE FROM CLOUDINARY