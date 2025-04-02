<!DOCTYPE html>
<html lang="en">

<head>

	
	
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Connect with your heart</title>

    <!-- Bootstrap Core CSS -->
    <link href="_/css/final.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="_/css/business-casual.css" rel="stylesheet">

    <!-- Fonts -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

	<div class="container">
		<div class="row">
			<div class="box">
			
				<?php if(isset($_POST['submit'])) 
				{
					$firstName = $_POST['firstName'];
					$lastName = $_POST['lastName'];
					$email = $_POST['email'];
					$question1 = $_POST['question1'];
					$question2 = $_POST['question2'];
					$question3 = $_POST['question3'];
					$question4 = $_POST['question4'];
					$newsletter = $_POST['newsletter'];
					$from = 'New Contact Form'; 
					$to = 'claudielarouche@gmail.com'; 
					$bcc = 'finefolksforum@gmail.com';
					$subject = 'Message from Contact Form ';
					
					$headers = "Bcc: finefolksforum@gmail.com\r\n";
					$headers .= "From: no-reply@yvonnestlouis.com\r\n" . "X-Mailer: php";
					$headers .= "MIME-Version: 1.0\r\n";
					$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
					
					
					if ($newsletter == 'on'){
						$newsletter= 'yes';
					}
					else {
						$newsletter = 'no';
					}
					
					$body = "First Name: $firstName\nLastName: $lastName\nE-Mail: $email\n\nAnswer to question 1:\n $question1\n\nAnswer to question 2:\n $question2\n\nAnswer to question3:\n $question3\n\nAnswer to question 4:\n $question4\n\nNewsletter? $newsletter\n\nThank you!";
			 
					// Check if name has been entered
					if (!$_POST['firstName']) {
						$errName = 'Please enter your name';
					}
					
					// Check if email has been entered and is valid
					if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
						$errEmail = 'Please enter a valid email address';
					}
				 
				// If there are no errors, send the email

					if (mail ($to, $subject, $body, $headers)) {
						echo "<div class=\"alert alert-success\">Thank You! I will be in touch</div>";
					} else {
						echo "<div class=\"alert alert-danger\">Sorry there was an error sending your message. Please try again later</div>";
					}	
				}
				else	// Display the Form and the Submit Button       
				{?>
					<div class="col-md-12">
						<h1>Welcome</h1>
						<hr/>
					</div>
					
					<div class="col-md-8">
				
						<p>How would you like to connect with people that value Esteem & Wealth to Accelerate YOUR Personal and Business Success?</p>

						<p>I am offering 10 Private Breakthrough Sessions where I will guide you and successfully help you to increase your connectedness that positively impact your life:  wellbeing, relationships, finances and business.</p>
						
						<p>DO YOU WANT TO HAVE MORE LOVE OR MONEY, BE HAPPIER, TRUST MORE, BE EMPOWERED TO GO ONE STEP FURTHER?</p>

						<p>Apply for your FREE Breakthrough Session Today.</p>
						
						<p>Fortunately I have helped many highly sensitive women, busy business women and entrepreneurs over the years and they have been able to increase their self-trust to get what they want and be happier and more satisfied at a deeper level.</p>
						
					</div>
					
					<div class="col-md-4">
						<img class="img-rounded" src="img/yvonne.jpg" alt="Photo of Yvonne">
						
						<h4>Yvonne St-Louis</h4>
						<h4>Expert in Connection™</h4>	
					</div>

				</div>
			</div>
			
			<div class="row">
				<div class="box">

			
				

				<p>All questions must be answered to be eligible for this Gift Breakthrough Session. </p>

				<p>IMPORTANT: Any received form with missing information will be deleted.</p>
			


				<form role="form" method="post" action="index.php">
					<div class="form-group">
						<label for="firstName" class="control-label">First Name*</label>
						<input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" value="" required>
					</div>
					<div class="form-group">
						<label for="lastName" class="control-label">Last Name*</label>
						<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" value="" required>
					</div>
					<div class="form-group">
						<label for="email" class="control-label">Email*</label>
						<input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="" required>
					</div>
					<div class="form-group">
						<label for="question1" class="control-label">What is the number one problem you would like most to solve regarding a disconnection with a situation, a person, that is challenging and what does this aspect of your life represent for you?</label>
						<textarea class="form-control" rows="4" name="question1"></textarea>
					</div>
					<div class="form-group">
						<label for="question2" class="control-label">Does this disconnection have anything to do with money?</label>
						<textarea class="form-control" rows="4" name="question2"></textarea>
					</div>
					<div class="form-group">
						<label for="question3" class="control-label">How important is it for you - on a scale of 1 to 10, (10 being very important)</label>
						<input type="question3" class="form-control" id="question3" name="question3" placeholder="" value="">
					</div>
					<div class="form-group">
						<label for="question4" class="control-label">Are you ready to get started today (yesterday), in 6 months or in 12 months?</label>
						<textarea class="form-control" rows="4" name="question4"></textarea>
					</div>
					
					<div class="checkbox">
						<label for="newsletter" class="control-label">
							<input type="checkbox" id="newsletter" name="newsletter" > Yes! I want to receive the Soulful Newsletter. And other information, practical tips to increase in Connectedness and Trust, the foundation of your Esteem such as Self-Love, Self-Confidence and Self-Worth that ripples positively into your Net-Worth.
						</label>
					</div>
					
					<div class="form-group">
						<input id="submit" name="submit" type="submit" value="Send" class="btn btn-default">
					</div>
					<div class="form-group">
						<div class="col-sm-10 col-sm-offset-2">
							<?php echo $result; ?>    
						</div>
					</div>
				</form>

			<?php }?>
			
			</div>
		</div>
	
	</div>
	
    <!-- Bootstrap Core JavaScript -->
    <script src="_/js/bootstrap.js"></script>
	<script src="_/js/myscript.js"></script>

</body>

</html>
