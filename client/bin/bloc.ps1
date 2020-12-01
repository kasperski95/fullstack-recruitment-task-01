 param (
    [Parameter(Mandatory=$true)][string]$name
 )

cd "$env:PROJECT_ROOT/generators"
npm start -- --name $name
Move-Item -Path $name -Destination "$env:PROJECT_ROOT/client/src/blocs"
cd $env:PROJECT_ROOT

