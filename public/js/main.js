$(document).ready(function(){
	$(".resources h5 .glyphicon-plus").click(function(){
		$(this).parent().parent().find("div.thumbnail").slideDown();
		$(this).parent().addClass("add");
		return false;
	});
	$(".resources h5 .glyphicon-minus").click(function(){
		$(this).parent().parent().find("div.thumbnail").slideUp();
		$(this).parent().removeClass("add");
		return false;
	});

	$('[data-toggle="confirmation"]').confirmation();

	$('#telephone').mask("(99) 9999-99999");

	$(document).on( 'submit', ".company .resources .form", function(){
		var dados = $( this ).serialize();
		var form = this;
		$.ajax({
			type: "POST",
			url: "/resource/create",
			data: dados,
			dataType: "json",
			success: function( data )
			{
				var template;
				var thumbnail = $('<span class="thumbnail">');
				var caption = $('<div class="caption">');
				var anchor = $('<a data-href="/resource/delete/'+ data.id +'" data-toggle="confirmation" class="glyphicon glyphicon-remove edit" title="Apagar recurso">');
				anchor.on('click', anchor.confirmation());

				template = thumbnail.append(
					caption.append(
						$('<h4>').append(data.name),
						$('<p>').append("R$ "+ data.cost +"<br>" + data.equipmentType.name)
					),
					anchor
				);

				$(form).parent().parent().append(template);
				$(form)[0].reset();
				$(".resources h5 .glyphicon-minus").click();

			},
			error: function( data )
			{
				console.log(data);
			}
		});
		return false;
	});	


	$(document).on( 'click', ".quote .resources .btn-success", function(){
		var container = $(this).parent().parent().parent().parent().parent();
		var amount = container.find('#amount');
		var resource = container.find('#resource');
		
		if ($(amount).val() > 0){

			var template;
			var thumbnail = $('<span class="thumbnail">');
			var caption = $('<div class="caption">');
			var anchor = $('<a class="glyphicon glyphicon-remove edit" title="Apagar recurso">');
			var hidden = $('<input type="hidden" name="quoteResource['+$.trim($(resource).val())+']" value="'+$(amount).val()+'">');

			template = thumbnail.append(
				hidden,		
				caption.append(
					$('<h4>').append($(resource).find('option:selected').text()),
					$('<p>').append($(amount).val() + " h")
				),
				anchor
			);
			container.append(template);
		}
		$('input[type=text]').val("");
		$(".resources h5 .glyphicon-minus").click();
		
		return false;
	});	

	$(document).on( 'click', ".quote .resources .glyphicon-remove", function(){
		$(this).parent().remove();
	});

});