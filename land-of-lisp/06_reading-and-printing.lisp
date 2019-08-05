(defun say-hello ()
  (print "Please type your name:")
  (let ((name (read-line)))
    (print "Nice to meet you, ")
    (print name)))

(defun add-five ()
  (print "please enter a number:")
  (let ((num (read)))
    (print "When I add five I get")
    (print (+ num 5))))

(defun game-repl ()
  (loop (print (eval (read)))))

(defun game-repl ()
  (let (
    (cmd (game-read)))
    (unless (eq (car cmd) 'quite)
      (game-print (game-eval cmd))
      (game-repl))
  ))

(defun game-read ()
  (let ((cmd (read-from-string (concatenate 'string "(" (read-line) ")"))))
  (flet ((quote-it (x) (list 'quote x)))
    (cons (car cmd) (mapcar #'quote-it (cdr cmd)))
  )
  )
)

(defparameter *allowed-commands* '(look walk pickup inventory))

(defun game-eval (sexp)
  (if (member (car sexp) *allowed-commands*)
    (eval sexp)
    '(i do not know that command))
)

(defun tweak-text (lst caps lit)
(when lst
  (let (
    (item (car lst))
    (rest (cdr lst))
    )
    (cond ((eq item #\space) (cons item (tweak-text rest caps lit)))
    )
  )
)
)
