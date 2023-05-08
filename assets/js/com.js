function loadMore() {
    $('#more').show()
    $('.fb-comments-loadmore').hide().remove()
}
$(document).ready(function() {
    $('date').each(function() {
        if ($(this).attr('data-date-minus')) {
            $(this).html(dateMinus($(this).attr('data-date-minus')))
        }
    })
})

function dateMinus(what) {
    var today = Date.now()
    var nw = today - what * 10000
    var newd = new Date()
    newd.setTime(nw)
    var mthName = ['Janeiro', 'Fevereiro', 'MarÃ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    var mthNm = mthName[newd.getMonth()]
    return (newd.getDate() +
        ' de ' +
        mthNm +
        ' de ' +
        newd.getFullYear() +
        ' ' +
        newd.getHours() +
        ':' +
        round(newd.getMinutes()))
}

function round(what) {
    if (what < 10) {
        return '0' + what
    } else {
        return what
    }
}
$('like').on('click', function() {
    if ($(this).hasClass('liked')) {
        $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) - 1)
        $(this).removeClass('liked')
        $(this).text('Curtir')
    } else {
        $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) + 1)
        $(this).addClass('liked')
        $(this).text('Descurtir')
    }
})
$('reply').on('click', function() {
    if (fbobj != null) {
        handleReply($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
    } else {
        logInWithFacebook(handleReply, $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
    }
})

function handleReply(id) {
    var text = ''
    var obj = $('#' + id)
    if (obj.hasClass('fb-comments-reply-wrapper')) {
        text = '@' + obj.find('name').text()
        obj = $('#' + id.split('-')[0])
    }
    obj.find('.row.reply-box').remove()
    obj.append('<div class="row reply-box" id="reply-' +
        obj.attr('id') +
        '"><div class="col-xs-10"><input type="text" value="' +
        text +
        '" placeholder="AÃ±ade una respuesta..." class="fb-reply-input" /></div><div class="col-xs-2"><button class="fb-reply-button" onclick="javascript:postReply(' +
        obj.attr('id') +
        ');">Responder</button></div></div>')
}

function postReply(id) {
    var obj = $('#reply-' + id)
    if (obj && obj.find('.fb-reply-input').val()) {
        var date = new Date()
        var fbreply = {
            forid: id,
            date: date,
            text: obj.find('.fb-reply-input').val()
        }
        fbreplies.push(fbreply)
        var replyc = reply.clone()
        replyc.attr('id', id + '-' + Math.floor(Math.random() * 100 + 10))
        replyc.find('name').text(fbobj.name)
        replyc.find('.fb-comments-comment-img').find('img').attr('src', fbobj.pictureURL)
        replyc.find('.fb-comments-comment-text').text(obj.find('.fb-reply-input').val())
        replyc.find('date').each(function() {
            if ($(this).attr('data-date-minus')) {
                $(this).html(dateMinus($(this).attr('data-date-minus')))
            }
        })
        $('#' + id).after(replyc)
        obj.remove()
        var today = new Date()
        today.setDate(today.getFullYear() + 1)
        setCookie('fbreplies', JSON.stringify(fbreplies), today)
    }
}
setTimeout(function() {
    $('#add-to-cart').show()
}, 20000)
var today = new Date()
today.setDate(today.getFullYear() + 1)
setCookie('returningVisitor', 'yes', today)


// Utiliza a API de Geolocalização do navegador para identificar a localização do usuário
navigator.geolocation.getCurrentPosition(function(position) {
  // Obtém a latitude e longitude do usuário
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Utiliza a API do OpenCage para obter o nome da cidade com base na latitude e longitude
  var url = "https://api.opencagedata.com/geocode/v1/json?q=" + latitude + "+" + longitude + "&key=dc02561f975646158af400187e581966";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Obtém o nome da cidade a partir da resposta da API
      var cidade = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county;

      // Atualiza a frase com a localização obtida e o número de mulheres aleatório entre 1 e 1000
      document.getElementById("numero-mulheres").innerText = Math.floor(Math.random() * 1000) + 1;
      document.getElementById("localizacao").innerText = cidade;
    });
});

