<html>
    <h1>
        <b>
            Library Search
        </b>
    </h1>
<body>
    <form>
    <label for="selectType"> Select Type: </label>
        <select id="searchType" name="searchType">
            <option value="book">Book</option><br></br>
            <option value="media">Media</option><br></br>
            <option value="electronic">Electronic</option><br></br>
            <option value="object">Object</option><br></br>
        <br></br></select>
    </form>
    <div id='booksid' >
    <form action="/searchBooks" method="post">
        <input hidden name='searchBy' value='book'></input>

        <label for="bookName"> Book Name: </label>
        <input type="text" id="bookname" name="BookName"><br></br></input>

        <label for="Author"> Author: </label>
        <input type="text" id="author" name="Author"><br></br></input>

        <label for="Genre"> Genre: </label>
        <input type="text" id="genre" name="Genre"><br></br></input>

        <label for="Genre"> Genre: </label>
        <select id="genre" name="Genre">
            <option value="adventure">Adventure</option><br></br>
            <option value="action">Action</option><br></br>
            <option value="fantasy">Fantasy</option><br></br>
            <option value="drama">Drama</option><br></br>
        </select><br></br>

        <label for="Language"> Language: </label>
        <input type="text" id="language" name="Language"><br></br></input>

        <label for="ISBN"> ISBN: </label>
        <input type="text" id="isbn" name="ISBN"><br></br></input>

        <input type="submit" value="Search" />

    </form>
    </div>

    <div id='mediaid' >
    <form action="/searchMedia" method="post">
        <input hidden name='searchBy' value='media'></input>

        <label for="mediaName"> Media Name: </label>
        <input type="text" id="medianame" name="MediaName"><br></br></input>

        <label for="Author">  Media Author: </label>
        <input type="text" id="author" name="Author"><br></br></input>

        <label for="Genre"> Genre: </label>
        <input type="text" id="genre" name="Genre"><br></br></input>

        <input type="submit" value="Search" />

    </form>
    </div>

    <div id='electronicid' >
    <form action="/searchElectronics" method="post">
        <input hidden name='searchBy' value='electronic'></input>

        <label for="electronicName"> Electronic Name: </label>
        <input type="text" id="electronicname" name="ElectronicName"><br></br></input>

        <label for="serialNo"> Serial #: </label>
        <input type="text" id="serialno" name="SerialNo"><br></br></input>

        <input type="submit" value="Search" />

    </form>
    </div>

    <script>
      const el = document.getElementById('searchType');
      const bookdiv = document.getElementById('booksid');
      const mediadiv = document.getElementById('mediaid');
      const electronicdiv = document.getElementById('electronicid');
      
      mediadiv.style.display = 'none';
      electronicdiv.style.display = 'none';
      el.addEventListener('change', function handleChange(event) {
         if (event.target.value === 'book') {
            bookdiv.style.display = 'block';
            mediadiv.style.display = 'none';
            electronicdiv.style.display = 'none';
         } else if (event.target.value === 'media') {
            bookdiv.style.display = 'none';
            mediadiv.style.display = 'block';
            electronicdiv.style.display = 'none';
         } else if(event.target.value === 'electronic') {
            mediadiv.style.display = 'none';
            bookdiv.style.display = 'none';
            electronicdiv.style.display = 'block';
         }
      });
   </script>    
</body>    
</html>