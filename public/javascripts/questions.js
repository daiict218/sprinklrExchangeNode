$(function(){
    var Question= function(title,text,tags,author){
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.author = author;
        this.answers = [];
        this.votes = 0;
        this.views = 0;
        this.time = new Date();
    }

    if(!localStorage.noOfQuestions){
        Question.prototype.quesId = 1;
    }
    else{
        Question.prototype.quesId = JSON.parse(localStorage.noOfQuestions)+1;
    }

    var model = {

        init: function(){
            if(!localStorage.author){
                localStorage.author = "Anonymous";
            }
            if(!localStorage.noOfQuestions)
                localStorage.noOfQuestions = JSON.stringify(0);

        },

        getAuthor: function(){
            return localStorage.author;
        },

        setAuthor: function(author){
            localStorage.author = author;
        },

        getTags: function(){
            return JSON.parse(localStorage.tags);
        },

        add:function(title,text,tags){
            var question = new Question(title,text,tags,model.getAuthor());

            question.id = Question.prototype.quesId;
            localStorage.setItem("question"+question.id,JSON.stringify(question));
            localStorage.setItem("noOfQuestions",question.id);
            var tagsArray = model.getTags();
            for (var i = tagsArray.length - 1; i >= 0; i--) {
                for(var j=tags.length-1;j>=0;j--){
                    if(tags[j] == tagsArray[i].tagName){
                        tagsArray[i].questionId.push(question.id);
                    }
                }
            };
            Question.quesId++;
            localStorage.tags = JSON.stringify(tagsArray);
        },

    };


    var octopus = {
        addNewQuestion:function(title,text,tags){
            model.add(title,text,tags);
            view.render();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init:function(){
            var button = $('#btn-submit');
            var dom = $('.mainbar');
            button.click(function(e){
                var title = dom.find("#input_element1").val();
                var text = dom.find("#wmd-preview").html();
                var errors = dom.find('.inputtags__errors');
                var elements = dom.find('.inputtags__element');
                var message = [];
                var selected = $("#options option:selected");
                
                selected.each(function (i) {
                    message[i] = $(this).text();

                });
                if(title === ""){
                    errors.html("Empty title");
                }
                else if(text === ""){
                    errors.html("Empty Body");   
                }
                else if(message.length === 0){
                    errors.html("No tags selected");   
                }
                else{
                    octopus.addNewQuestion(title,text,message);
                    window.location.href="index.html";
                }   
                e.preventDefault();
            });
            $("#btn-discard").click(function(e){
                $('#wmd-input').val('');
            });
            view.render();
        },
        render:function(){
           var index = -1;
           var htmlStr = tags.reduce(function(a,b){
                index++;
                return a + "<option value="+(index+1)+">"+b+"</option>"; 
           },'');
           $("#options").html(htmlStr);
        }
    };
    octopus.init();
});