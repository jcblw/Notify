## Notify - Let them know

Notify is a jquery plugin/extension that makes webpage notification handling easy.

    $.notify.alert('Notify - Let them know');
    
### Adding it to your site.

Add the two file plus the optional image.

    <link type="text/css" media="screen" href="notify.css">
    <script src="notify.js"></script>
    
Oh in case you dont have it add [jQuery](http://jquery.com) befor script

#### Is it working?

add this line to your console
    
    $.notify.success('YES it is');
    
if you see a bar across the top of you page congrats. Now go ahead and close it.

    $.notify.close();
    
### Options

    $.notify.basic(string, {options});
    
#### close

Close will add a X in the top right corner so that the user has the ability to close the notification

    {close : true}//Default is false - boolean
    
#### autoClose

autoClose will close the notification automatically with a timer

    {autoClose : 1000}//units are milliseconds - integer
    
#### occupySpace

This allows the notification to occupy its height at the top of the page

    {occupySpace : true}//default is false - boolean
    
#### btn *new*

This will add a btn to the right hand side of the notification

##### value _optional_

You are allowed to give the button a value to display on the Notification

##### callback _required_

Gives you the ability to run some script once the button has been clicked

    {
        btn: { // object
            buttonName : { //object
                value : 'a string of text', //optional will display buttonName if not specified - string
                calback : function(){
                    //Do stuff
                } // required - function
            }
        }
    }
    
#### All Together

    $.notify.basic('a string', {
        close : true,
        autoClose : 1000,
        occupySpace : true,
        btn : {
            buttonName : {
                value : 'A button',
                callback : function(){
                    console.log('Callback Successful');
                }
            }
            //Also supports multiple buttons
        }
    })
    
### Gimme more

[Notify Home Page](http://redeyeoperation.com/plugins/Notify)