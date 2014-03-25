OpalHandler = {

  outputHTML: '                                \
         <pre><code class="ruby" style="height: 5em;"></code></pre> \
         <div style="text-align: right;">           \
          <button>Run</button>                 \
        </div>                                 \
   ',

  rubyPre: "                  \
      def $stdout.puts(s)  \n \
        @out ||= []        \n \
        @out << s          \n \
      end                  \n \
                           \n \
      def $stdout.out      \n \
        @out               \n \
      end                  \n \
                           \n \
      def $stdout.flush    \n \
        @out = []          \n \
      end                  \n \
    \n",

  rubyPost: '\n                       \
    ret = $stdout.out.join("\n");  \n \
    $stdout.flush                  \n \
    ret                            \n \
  ',

  evaluate: function(ruby) {
    var rubyToEvaluate = this.rubyPre + ruby + this.rubyPost;
    var evaluated = Opal.Opal.$eval(rubyToEvaluate);
    return evaluated;
  },

  setup: function() {
		var nodes = document.querySelectorAll('[opal]');

		for (var i = 0, len = nodes.length; i < len; i++) {
			var element = nodes[i];
      var appendAt = element.parentNode.parentNode;
      var div = document.createElement("code");
      div.innerHTML = this.outputHTML;
      button = div.querySelector('button');
      appendAt.appendChild(div);
      button.addEventListener('click', function() {
        ruby = this.parentNode.parentNode.parentNode.querySelector('code').textContent;
        output = this.parentNode.parentNode.querySelector('code');
        output.innerHTML = OpalHandler.evaluate(ruby);
      }, false);
		}
	}
};

OpalHandler.setup();
