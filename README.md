## Notify - Let them know

Notify is a jquery plugin/extension that makes webpage notification handling easy.

``` javascript
$.notify('Notify - Let them know');
```
    
### Adding it to your site.

Add the two files plus the optional image.

``` html
<link type="text/css" media="screen" href="notify.css">
<script src="notify.js"></script>
```
    
Oh in case you dont have it add [jQuery](http://jquery.com) before script

#### Is it working?

add this line to your console
  
``` javascript
$.notify('YES it is');
```
    
if you see a bar across the top of you page congrats. Now go ahead and close it.

``` javascript
    $.notify.close();
```
    
### Options

``` javascript
    $.notify('string', {options});
```
    
#### close

Close will add a X in the top right corner so that the user has the ability to close the notification

``` javascript
    {close : true}//Default is false - boolean
```
    
#### autoClose

autoClose will close the notification automatically with a timer

``` javascript
    {autoClose : 1000}//units are milliseconds - integer
```
    
#### occupySpace

This allows the notification to occupy its height at the top of the page

``` javascript
    {occupySpace : true}//default is false - boolean
```
    
#### btn *new*

This will add a btn to the right hand side of the notification

##### value _optional_

You are allowed to give the button a value to display on the Notification

##### callback _required_

Gives you the ability to run some script once the button has been clicked

``` javascript
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
```
    
#### All Together

``` javascript
    $.notify('a string', {
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
```    
    
## Changing the style of Notify

Grey isnt always the best fit for a notifcation so we baked in some extra styles just for that reason.

####Success

Success is a green scheme

``` javascript
    $.notify.success('Success it Worked');
```
    
####Alert

Alert is a yellow scheme

``` javascript
    $.notify.alert('Something needs your attention');
```
    
####Error

Error is a red scheme

``` javascript
    $.notify.error('Please Fill out Required Feilds');
```
    
####_and_ Basic

This is the basic grey theme. For backwards compatability we still support

``` javascript
    $.notify.basic('Check us out on Facebook');
```
    
But now it just so much easier to use

``` javascript
    $.notify('Check us out on Google +');
```
    
####*Custom* Styles

Have a situation when you need something differnt? Maybe a blue theme. No problem.

First just create your styles. Here is a good [Gradient Generator](http://www.colorzilla.com/gradient-editor/). The class of the new style will be

``` CSS
    .notify-%new-style-name%
```
    
Once your styles are set then just call

``` javascript
    $.notify.custom('%new-style-name%', 'Hello World');
```
    
As you can see just replace %new-style-name% with a word describing the style. eg blue, attention, bulletin.

Lets say you want to use it multiple times with having to use the custom method. Just extend Notify.

``` javascript
    $.extend( $.notify, {
        blueCustom : function(txt, options){
            $.notify.custom('blueCustom', txt, options);
        }
    };
    
    //Now just do this
    
    $.notify.blueCustom('Yeeeah it custom styles work');
```

As long as the styles are defined right then your good.

### Returning the Notify Element

Brand new feature that is still on the chopping block but could be very useful. Now when using the shorthand `$.notify('Hello World')`, the function will return the Notify element. This will allow you to chain on functions to manipulate the element. Lets say we would like to add an extra class on to the Notify element.

``` javascript
    $.notify('Extra class added').addClass('extra-class');
```
    
You can also edit the CSS of the Notify element

``` javascript
    $.notify('You edited my text color, badass').css('color', '#bada55');
```
    
_Note: this will over write all text color on all styles. The style will only be removed if you do it manually._

``` javascript
    $.notify('Removed those pesky styles').attr('style', '');
    
    //or
    
    $('#notify').attr('style', '');
```

###Notify will bend to your needs

All styles are done in the CSS. _except height_. So you can edit exsisting styles to suit your needs.