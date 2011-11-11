/*
 * Notify - A Jquery Notification Extension
 * Author: Jacob Lowe http://redeyeoperations.com
 * Twitter Handle @jacoblowe2dot0
*/


// jQuery.support.transition
// to verify that CSS3 transition is supported (or any of its browser-specific implementations)

$.support.transition = (function(){ 
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
    
    return support; 
}());

(function($){
    
    var ele, space, timer,
            modTest = $.support.transition,
            show = (modTest) ?
                    function(element, extClass , txt){
                            element
                                .attr('class', 'notify-' + extClass + ' notify-visible')
                                .html(txt);
                    } :
                    function(element, extClass , txt){      
                            element
                                .attr('class', 'notify-' + extClass + ' notify-visible')
                                .html(txt)
                                .animate({height: '30px'},400);
                    },
            hide = (modTest) ?
                    function(element){
                            element
                                    .removeClass('notify-visible')
                                    .addClass('notify-hidden')
                                    .empty();
                    } :
                    function(element){
                            element
                                    .removeClass('notify-visible')
                                    .addClass('notify-hidden')
                                    .empty()
                                    .animate({height: '0px'},400);
                        
                    },
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
            build = function(){
                
                    $('body')
                            .prepend('<div class="notify-hidden" id="notify" rel="Notifications"></div>\
                                                <div id="notify-placeholder"></div>');           
                    ele = $('#notify');
                    space = $('#notify-placeholder');
            
            },
            handle = function(type, txt, options){
                    
                    clearTimeout(timer);    
                
                    if(typeof (options) === 'object'){            
                            if(options.close){
                                txt = txt + ' <div class="notify-close"></div>';
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
                            
                    }else{                       
                        show(ele, type, txt);                        
                    }                
            };

    $.extend({
        notify : {
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
        }
    });
    
    build();
    
}(jQuery));