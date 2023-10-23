#pull changes

git pull

#build image for container
docker build . -t reservationsystembe

#run container
docker run --name reservationsystembe -p 8180:80 -d reservationsystembe