/*
 * Notify 0.0.4 - A Jquery Notification Extension
 * Homepage: redeyeoperation.com/plugins/Notify
 *
 * Author: Jacob Lowe (redeyeoperations.com)
 * Twitter Handle @jacoblowe2dot0
 *
 * Copyright (c) 2010 Jacob Lowe (http://redeyeoperations.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * 
 * Built for jQuery library
 * http://jquery.com
 *
 * jQuery.support.transition
  *to verify that CSS3 transition is supported (or any of its browser-specific implementations)
 */

$.support.transition = (function(){ 
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
    
    return support; 
}());

//Start of actual extension
//Self Execution Anonymous Function
(function($){
     //Declaring some variables
    var ele, space, timer, btns,
            //building transition depending on features
            tran = [($.support.transition) ? 'css' : 'animate', ($.support.transition) ? '' : 1000],
            //Show animation + classes toggle/reset
            show = function(element, extClass , txt){      
                            element
                                .attr('class', 'notify-' + extClass + ' notify-visible')
                                .html(txt)
                                [tran[0]]({height: '50px'},tran[1]);
            },
            //Hide animation + classes toggle
            hide = function(element){
                            element
                                    .removeClass('notify-visible')
                                    .addClass('notify-hidden')
                                    .empty()
                                    [tran[0]]({height: '0px'},tran[1]);
                        
            },
            //Events object
            events = {
                    close : function(){
                        $('.notify-close').bind('click', function(){
                                
                                hide(ele);
                                hide(space);
                                $(this).unbind('click');
                        });
                    },
                    autoClose : function(time){
                        
                             timer = setTimeout(function(){   
                                    hide(ele);
                                    hide(space);
                            },time)
                        
                    }
            },
            //Build - Adding element to the document
            build = function(){
                
                    $('body')
                            .prepend('<div class="notify-hidden" id="notify" rel="Notifications"></div>\
                                                <div id="notify-placeholder"></div>');           
                    ele = $('#notify');
                    space = $('#notify-placeholder');
            
            },
            //Were variables are parsed and order of event are defined
            handle = function(type, txt, options){
                    //Clear timeout if there is one
                    clearTimeout(timer);    
                    //We have option
                    if(typeof (options) === 'object'){
                            //New button feature
                            if(typeof(options.btn) === 'object'){
                                //Array to support multiple btns
                                btns =[];
                                //declaring our btn object
                                $.notify.btn = {};
                                //Loop through all the btns in the object
                                for (var btn in options.btn) {
                                    //If the btn object exist and it has a callback
                                    if (options.btn.hasOwnProperty(btn) && typeof (options.btn[btn].callback) === 'function'){
                                        //Define our callback
                                        $.notify.btn[btn] = options.btn[btn].callback;
                                        //Allow setting a name for the btn
                                        var val = (typeof (options.btn[btn].value) === 'string' ) ? options.btn[btn].value : btn;
                                        //Build btn and attach callback
                                        btns.push('<a href="#btn-' + btn + '" class="notify-btn" onclick="$.notify.btn.' + btn + '()">' + val + '</a>');
                                    }
                                }
                                //Join btns
                                btns = btns.join('');
                                //Add btns to string of text
                                txt =  btns + txt;
                            }
                        
                            if(options.close){
                                txt = '<div class="notify-close"></div>' + txt;
                                type  = type + ' notify-close-option';
                                show(ele, type, txt);
                                events.close(ele)
                            }else{                                                
                                    show(ele, type, txt);                          
                            }
                            
                            if(typeof (options.autoClose) === 'number'){
                                        events.autoClose(options.autoClose);
                            }
                            
                            if(options.occupySpace){                               
                                    show(space, 'blank', '');                           
                            }

                    //No options
                    }else{                       
                        show(ele, type, txt);                        
                    }                
            };
    //Extending jquery 
    $.notify = (function(){
        var notify = function(txt, options){
            handle('basic', txt, options);
        };
            //Creating a prototype for notify
            notify.prototype = {
                custom : function (type, txt, options) {
                    handle(type, txt, options);
                },
                success: function(txt, options){
                    handle('success', txt, options);
                },
                error : function(txt, options){
                    handle('error', txt, options);
                },
                alert : function(txt, options){
                    handle('alert', txt, options);
                },
                basic : function(txt, options){
                    handle('basic', txt, options);
                },
                close : function(){
                    hide(ele);
                    hide(space);
                }
            };
        //Extending notify with its prototype
        $.extend(notify, notify.prototype);
        //Returning notify object
        return notify;
    }());
    
    //Script about loaded let build
    build();
    
}(jQuery));